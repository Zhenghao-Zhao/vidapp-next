import { useEffect, useState } from "react";

type Props = {
  url: string;
}

type Response = {
  status: number;
  statusText: string;
  data: any;
  error: any;
  loading: boolean;
}


export default function useFetchData({ url } :Props) {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [statusText, setStatusText] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  }, [])

  return (
    <div>useFetchData</div>
  )
}