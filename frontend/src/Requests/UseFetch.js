import * as React from "react";
import axios from "axios";

export default function UseFetch(url) {
  const [loading, setloading] = React.useState(true);
  const [error, seterror] = React.useState(null);
  const [data, setdata] = React.useState(null);
  React.useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await axios.get(url);
        setdata(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error.response);
      }
    };
    getdata();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, data };
}
