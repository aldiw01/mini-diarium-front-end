export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Main Menu',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Arsip',
      url: '/archives',
      icon: 'icon-drawer',
      children: [
        {
          name: 'Kebijakan & Regulasi',
          url: '/archives/regulations',
          icon: 'icon-umbrella',
        },
        {
          name: 'Informasi & Publikasi',
          url: '/archives/publications',
          icon: 'icon-book-open',
        },
        {
          name: 'Akreditasi',
          url: '/archives/accreditations',
          icon: 'icon-flag'
        }
      ]
    }
  ]
};
