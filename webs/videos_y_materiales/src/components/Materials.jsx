import { Button, Timeline } from 'flowbite-react';
import { IoMdDownload } from 'react-icons/io';

const data = [
  {
    title: "Innovaciones en Tecnología",
    date: "2024-07-15",
    description: "Una conferencia sobre las últimas innovaciones en el sector tecnológico.",
    link: "https://example.com/tecnologia"
  },
  {
    title: "Cumbre de Negocios Internacionales",
    date: "2024-06-20",
    description: "Evento anual donde líderes empresariales discuten tendencias y oportunidades globales.",
    link: "https://example.com/negocios"
  },
  {
    title: "Festival de Cine Independiente",
    date: "2024-08-05",
    description: "Proyección de películas independientes de directores emergentes.",
    link: "https://example.com/cine"
  },
  {
    title: "Exposición de Arte Moderno",
    date: "2024-09-10",
    description: "Muestra de las obras más recientes de artistas contemporáneos.",
    link: "https://example.com/arte"
  },
  {
    title: "Concierto de Música Clásica",
    date: "2024-07-30",
    description: "Presentación de una orquesta sinfónica interpretando piezas clásicas.",
    link: "https://example.com/musica"
  }
];


const Materials = () => {
  return (
    <div className='Materials'>
      <Timeline>
        {data.map(({ title, date, description, link }, index) => (
          <Timeline.Item key={index}>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>{date}</Timeline.Time>
              <Timeline.Title>{title}</Timeline.Title>
              <Timeline.Body>
                {description}
              </Timeline.Body>
              <Button color="gray" className='text-blue-500'>
                Descargar
                <IoMdDownload className="ml-2 h-5 w-5" />
              </Button>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default Materials;