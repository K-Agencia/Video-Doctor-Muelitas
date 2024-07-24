import Materials from '../components/Materials';
import ReactPlayer from 'react-player';
import '../css/Home.css';
import { useSelector } from 'react-redux';

const Home = () => {

  const { firstname } = useSelector(({ user }) => user.children);

  const wWidth = window.screen.width;

  return (
    <div className='Home w-5/6 md:w-4/6 mx-auto'>
      <h1 className='text-3xl font-bold my-3'>Hola, {firstname}</h1>

      <div className="video-responsive flex justify-center items-center">
        <ReactPlayer
          url={"https://vimeo.com/989732519/9e0319dfe5"}
          width={"100%"}
          height={wWidth > 780 ? 700 : 300}
          config={{
            vimeo: {
              controls: true,
              playsinline: false,
              quality: 'auto',
              playerOptions: {
                dnt: true, 
              },
            }
          }}
          volumen={1}
          controls
        />
      </div>

      <div className='mt-5' id='materiales'>
        <h1 className='mb-3 text-2xl font-bold'>Materiales de descarga</h1>
        <Materials />
      </div>
    </div>
  );
};

export default Home;