module.exports = {
  title: `@soheeeep`,
  description: `개발의 즐거움은 '함께 가치를 만들어 나가는 것'이라 생각합니다. 도전을 통한 성취를 원동력으로 하루하루 나아갑니다. 공부하고 경험한 내용들을 기록하고 있습니다.`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://soheeeep.github.io`,
  ogImage: `/author.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `https://github.com/soheeeeP/soheeeep.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-13NCP9079H', // Google Analytics Tracking ID
  author: {
    name: `박소희`,
    bio: {
      role: `개발자`,
      description: ['기술로 가치를 만들어내고 싶은', '도전을 즐기는'],
      thumbnail: `author.png`, // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/soheeeeP`,
      linkedIn: `https://www.linkedin.com/in/so-hee-park/`,
      email: `soheeeep212@gmail.com `,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022. 7. ~ 12.',
        activity: '2022 오픈소스 컨트리뷰톤 아카테미',
        links: {
          post: 'https://soheeeep.tistory.com/category/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4%20%EC%BB%A8%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%86%A4',
          code: 'https://github.com/lablup/backend.ai/issues?q=assignee%3AsoheeeeP',
        },
      },
      {
        date: '2020. 2. ~ 2021. 2.',
        activity: '서강대학교 IT 서비스 개발 동아리 멋쟁이사자처럼 8기',
        links: {
          github: 'https://github.com/soheeeeP/ChaekHwaJeom',
        },
      },
      {
        date: '2020. 8. ~ 12.',
        activity: 'IBM C:Louders 1기',
        links: {
          post: 'https://soheeeep.tistory.com/category/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/IBM%20C%3ALouders',
        },
      },
      {
        date: '2020. 8.',
        activity: '서강대학교-현대모비스 SW 인재양성 프로젝트',
        links: {
          github: 'https://github.com/soheeeeP/Autonomous-Car-Project',
          post: 'https://soheeeep.tistory.com/category/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EC%9E%90%EC%9C%A8%EC%A3%BC%ED%96%89%20%EC%9E%90%EB%8F%99%EC%B0%A8%20%EC%A0%9C%EC%9E%91%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8',
        },
      },
    ],

    opensources: [
      //   // =====        [Open Source Sample and Structure]        =====
      {
        name: '',
        description: '',
        links: {
          github: '',
        }
      },
    //   // ========================================================
      {
        name: 'Backend.AI',
        number: '#713',
        description: 'storage-proxy 동작에 대해 권한이 없는 사용자의 접근을 제한하여 데이터 안정성 향상',
        links: {
          github: 'https://github.com/lablup/backend.ai/pull/713', 
        },
      },

      {
        name: 'Backend.AI',
        number: '#721',
        description: 'release note에 commit history를 추가하도록 Python 스크립트를 개선하여 효율성 증대',
        links: {
          github: 'https://github.com/lablup/backend.ai/pull/721', 
        },
      },
      // {
      //   name: 'Backend.AI',
      //   description: '클라우드에서 효율적인 GPU 연산 환경의 컨테이너를 제공하는 파이선 오픈소스 플랫폼',
      //   linkList: ['https://github.com/lablup/backend.ai/pull/713', 'https://github.com/lablup/backend.ai/pull/721'],
      //   summaryList: ['storage-proxy 동작에 대해 권한이 없는 사용자의 접근을 제한하여 데이터 안정성 향상', 'release note에 commit history를 추가하도록 Python 스크립트를 개선하여 효율성 증대'],
      // },
    ],

    projects: [
    //   // =====        [Project Sample and Structure]        =====
    //   // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: [],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          note: '',
        },
      },
    //   // ========================================================
    //   // ========================================================
      {
        title: 'Scribble',
        description: 'Django REST Framework와 React, PostgreSQL, Redis를 사용하여 개발한 필사노트 웹 서비스입니다. 책 속의 문장을 손으로 써서 저장하고 공유하며 생각을 공유할 수 있습니다. 필사노트 및 댓글 작성, 도서별 필사 페이지 모아보기, 약 80,000건의 도서 검색 기능을 제공합니다. ERD를 설계하고 REST API 서버를 개발하였으며, Github Action와 self-host runner를 적용하여 EC2 환경에서의 테스트, 빌드 및 릴리즈 프로세스를 자동화하였습니다.',
        techStack: ['python', 'django', 'postgreSQL', 'docker-compose', 'github action', 'aws'],
        thumbnailUrl: '/scribble_thumbnail.png',
        links: {
          post: 'https://soheeeep.tistory.com/63',
          github: 'https://github.com/M-TO-M/scribble_server',
          note: 'https://www.notion.so/scribble-mtom/Scribble-2514789b139449c0acade9d332cc9703',
        },
      },
      {
        title: 'Navigation Service For the Blind',
        description: 
          '시각장애인을 위한 Text-to-Speech 기반의 길 안내 iOS 어플리케이션입니다. Semantic Segmentation 기반의 DeeplabV3 모델을 사용하여 실시간 도로 영상을 분석하고 사물을 11개의 라벨로 구분합니다. 프레임의 연속성과 픽셀의 불연속성을 기반으로 한 Dual-Camera Callibration을 적용하여 3차원 공간에서의 분석 정확도를 개선했습니다. 캡스톤디자인I 프로젝트 1위를 차지했으며, 기술 특허(제10-2021-0061396호)를 출원하였습니다.',
        techStack: ['swift', 'firebase'],
        thumbnailUrl: '/bme_thumbnail.png',
        links: {
          github: 'https://github.com/soheeeeP/Be-My-Eyes',
          note: 'https://doi.org/10.8080/1020210061396',
        }
      },
    ],

    educations: [
      //   // =====        [Education Sample and Structure]        =====
      {
        name: '',
        degree: '',
        degree: '',
        credit: ''
      },
      //   // ========================================================
      {
        name: '서강대학교',
        date: '2017. 3 ~ 2021. 2',
        degree: '컴퓨터공학과 학사',
        credit: '3.45 / 4.5',
      }
    ],

    items: [
      //   // =====        [Item Sample and Structure]        =====
      {
        title: '',
        links: {
          post: '',
        },
        date: '',
        agency: '',
        description: '',
        // description: [],
      },
      //   // ========================================================
      {
        title: '오픈소스 컨트리뷰션 아카테미 장려상',
        links: {
          post: '',
        },
        date: '2022. 12',
        agency: '정보통신산업진흥원',
        description: 'Backend.AI팀 리드멘티',
      },
      {
        title: '시각장애인 보행 보조 시스템',
        links: {
          post: 'https://doi.org/10.8080/1020210061396',
        },
        date: '2021. 8',
        agency: '특허청',
        description: '제10-2021-0061396호',
      },
      {
        title: '서강 창업 아이디어톤 3위',
        links: {
          post: '',
        },
        date: '2021. 2',
        agency: '서강대학교',
        description: '뜻밖의 지혜를 만날 수 있는 공간 “책화점” ',
      },
    ],
  },
};
