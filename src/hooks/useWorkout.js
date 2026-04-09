import { useState, useEffect, useCallback } from 'react';
import { sheetsReq } from '../services/googleSheets';
import { getTargetDateStr } from '../utils/dateHelpers';

export const useWorkout = (token, sheetId, currentDay, program) => {
  const [sessionLog, setSessionLog] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchState = useCallback(async () => {
    if (!token || !program) return;
    setLoading(true);
    try {
      const dateStr = getTargetDateStr(currentDay);
      const data = await sheetsReq('GET', `/values/log!A1:K2000`, null, token, sheetId);
      const rows = data?.values || [];
      
      const dayState = {};
      rows.forEach(r => {
        if (r[0] === dateStr && r[1] === currentDay) {
          const exId = r[5];
          const setIdx = parseInt(r[7]);
          if (!dayState[exId]) dayState[exId] = { sets: [] };
          dayState[exId].sets[setIdx] = { 
            done: r[10] === 'yes', 
            rpe: r[9] ? parseInt(r[9]) : null,
            weight: r[8] 
          };
        }
      });
      setSessionLog(prev => ({ ...prev, [dateStr]: dayState }));
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [token, sheetId, currentDay, program]);

  useEffect(() => { fetchState(); }, [fetchState]);

  return { sessionLog, setSessionLog, loading, refresh: fetchState };
};
