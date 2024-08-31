import { useParams } from 'react-router-dom';

type IParams = {
  id: string;
};

function Profile() {
  const params = useParams<IParams>();
  console.log(params);
  return (
    <>
      <h1 className=' text-2xl'>Profile page id: {params.id}</h1>
    </>
  );
}

export default Profile;
