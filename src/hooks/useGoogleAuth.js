import { useState, useEffect, useCallback } from 'react';

export const useGoogleAuth = (clientId) => {
  const [token, setToken] = useState(localStorage.getItem('wb_token'));
  const [status, setStatus] = useState('connecting');

  const handleResponse = useCallback((resp) => {
    if (resp.error) {
      setStatus('err');
      return;
    }
    const expiry = Date.now() + (resp.expires_in - 60) * 1000;
    setToken(resp.access_token);
    localStorage.setItem('wb_token', resp.access_token);
    localStorage.setItem('wb_expiry', expiry);
    setStatus('ok');
  }, []);

  const login = useCallback(() => {
    if (!window.google) return;
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      callback: handleResponse,
    });
    client.requestAccessToken();
  }, [clientId, handleResponse]);

  useEffect(() => {
    const cachedToken = localStorage.getItem('wb_token');
    const expiry = localStorage.getItem('wb_expiry');
    if (cachedToken && Date.now() < parseInt(expiry)) {
      setToken(cachedToken);
      setStatus('ok');
    } else {
      setStatus('err');
    }
  }, []);

  return { token, status, login };
};
