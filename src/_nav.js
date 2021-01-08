export default {
  items: [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'icon-home'
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
      name: 'Log Activities',
      url: '/activities',
      icon: 'icon-cursor'
    },
    {
      name: 'Curhat',
      url: '/curhat',
      icon: 'icon-bubbles'
    },
    {
      name: 'Profile',
      url: '/profile',
      icon: 'icon-user'
    }
  ]
};
