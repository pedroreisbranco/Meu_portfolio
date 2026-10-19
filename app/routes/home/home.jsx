import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/gamestack-login.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoder wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Desenvolvimento, IA e Automação',
    description: `Portfólio de ${config.name}: automações com n8n, agentes de IA, integrações de APIs, CRM e desenvolvimento web.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        buttonText="Conversar sobre o projeto"
        buttonLink="https://wa.me/5551992415089?text=Olá%20Pedro,%20quero%20conversar%20sobre%20agentes%20de%20IA"
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Agentes de IA para atendimento e agendamento"
        description="Assistentes conectados a WhatsApp, APIs e ferramentas de agenda para qualificar conversas, responder dúvidas e encaminhar pedidos de agendamento com regras claras."
        showButton={true}
        model={{
          type: 'laptop',
          alt: 'Interface ilustrativa em notebook',
          textures: [
            {
              srcSet: `${sprTexture} 1280w, ${sprTextureLarge} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        buttonText="Conversar sobre o projeto"
        buttonLink="https://wa.me/5551992415089?text=Olá%20Pedro,%20quero%20conversar%20sobre%20automação%20de%20CRM"
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Automação de CRM e follow-up de leads"
        description="Workflows que conectam WhatsApp, Chatwoot, CRMs e bancos de dados para organizar contatos, registrar conversas e automatizar acompanhamentos comerciais."
        showButton={true}
        model={{
          type: 'phone',
          alt: 'Interfaces ilustrativas em smartphone',
          textures: [
            {
              srcSet: `${gamestackTexture} 375w, ${gamestackTextureLarge} 750w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: `${gamestackTexture2} 375w, ${gamestackTexture2Large} 750w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        buttonText="Conversar sobre o projeto"
        buttonLink="https://wa.me/5551992415089?text=Olá%20Pedro,%20quero%20conversar%20sobre%20um%20site%20ou%20produto%20digital"
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Sites, landing pages e produtos digitais"
        description="Desenvolvimento de sites profissionais e experiências web, e estou desenvolvendo o Prospecta Sites, uma ferramenta para organizar a prospecção e as oportunidades comerciais."
        showButton={true}
        model={{
          type: 'laptop',
          alt: 'Preview ilustrativo de produto web',
          textures: [
            {
              srcSet: `${sliceTexture} 800w, ${sliceTextureLarge} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};