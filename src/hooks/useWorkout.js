import { useState, useEffect, useCallback } from 'react';
import { sheetsReq } from '../services/googleSheets';
import { getTargetDateStr } from '../utils/dateHelpers';

// NAMED EXPORT: Required for the { useWorkout } import in App.jsx
export const useWorkout = (token, sheetId, currentDay, program) => {
  const [sessionLog, setSessionLog] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchState = useCallback(async () => {
    if (!token || !program) return;
    setLoading(true);
    const dateStr = getTargetDateStr(currentDay);
    
    try {
      const data = await sheetsReq('GET', `/values/log!A1:K1000`, null, token, sheetId);
      const rows = data?.values || [];
      const dayState = {};

      rows.forEach((r) => {
        const sheetDate = String(r[0]).trim();
        const sheetDay = String(r[1]).toLowerCase().trim();
        const targetDay = currentDay.toLowerCase().trim();

        if (sheetDate === dateStr && sheetDay === targetDay) {
          const exId = r[5];
          const setIdx = parseInt(r[7]) || 0;
          if (!dayState[exId]) dayState[exId] = { sets: [] };
          
          const targetIdx = exId.startsWith('flow-') ? 0 : setIdx;
          dayState[exId].sets[targetIdx] = { 
            done: r[10] === 'yes', 
            rpe: r[9] ? parseInt(r[9]) : null, 
            weight: r[8] 
          };
        }
      });
      
      setSessionLog(prev => ({ ...prev, [dateStr]: dayState }));
    } catch (e) { 
      console.error("[SYNC ERROR]", e); 
    } finally { 
      setLoading(false); 
    }
  }, [token, sheetId, currentDay, program]);

  useEffect(() => { fetchState(); }, [fetchState]);
  return { sessionLog, setSessionLog, loading, refresh: fetchState };
};
