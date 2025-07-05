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

  const triggerUpdateUser = async (url,payload,token) => {

    setLoading(true);

    setError(null);

    try 
    {
      const response = await axios.put(url,payload,{
        headers: {
              authorization: token
          }
      });
      setData(response.data);

      return response.data;
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

  }

  const triggerUploadPost = async (url,payload,token) =>{

    setLoading(true);

    setError(null);

    try 
    {
      const response = await axios.post(url,payload,{
        headers: {
              authorization: token
          }
      });
      setData(response.data);

      return response.data;
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

  }

  const triggerGetPostById = async (url,token)=>{


    setLoading(true);

    setError(null);

    try 
    {
      const response = await axios.get(url,{
        headers: {
              authorization: token
          }
      });
      setData(response.data);

      return response.data;
    } 
    catch (err) 
    {
      setError(err);
      console.error("API Get Error:", err);
      return null;
    } 
    finally {
      setLoading(false);
    }

  }

  const triggerGetAllPosts = async (url)=>{

    setLoading(true);

    setError(null);

    try 
    {
      const response = await axios.get(url,{
       
      });
      setData(response.data);

      return response.data;
    } 
    catch (err) 
    {
      setError(err);
      console.error("API Get Error:", err);
      return null;
    } 
    finally {
      setLoading(false);
    }
  }

  return { triggerPost,triggerUpdateUser,triggerUploadPost, triggerGetPostById,triggerGetAllPosts , data, loading, error };
};

export default useApi;