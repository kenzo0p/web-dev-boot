import axios from "axios";
const page = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/user/details"
  );
  //   useEffect(() => {
  //     axios
  //       .get(
  //         "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
  //       )
  //       .then((response) => {
  //         setData(response.data);
  //         setLoading(false);
  //       });
  //   }, []);
  const data = response.data; 
  return (
    <div className="mx-auto border p-4 border-amber-50 w-fit shadow-2xl shadow-amber-200">
      {data.name} <br />
      {data.email}
    </div>
  );
};

export default page;
