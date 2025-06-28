import { useState } from "react";
import axios from "axios";

const useApi = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const triggerPost = async (url, payload) => {

    setLoading(true);

    setError(null);

    try {
      const res = await axios.post(url, payload);

      setData(res.data);

      
      return res.data; 
    } 
    catch (err) 
    {
      setError(err);
      console.error("API POST Error:", err);
      return null;
    } 
    finally {
      setLoading(false);
    }
  };

  return { triggerPost, data, loading, error };
};

export default useApi;