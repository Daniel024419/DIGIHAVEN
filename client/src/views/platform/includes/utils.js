export const categoryData = [
  {
    name: "Worker1",
    type: "cleaner",
    link: "/booking",
    img: "../../../uploads/bg.jpeg",
    desc: "This command will add the library to your project.",
  },

  {
    name: "Worker2",
    type: "welder",
    link: "/booking",
    img: "../../../uploads/bg.jpeg",
    desc: "This command will add the library to your project.",
  },
  {
    name: "Worker3",
    type: "carpenter",
    link: "/booking",
    img: "../../../uploads/bg.jpeg",
    desc: "This command will add the library to your project.",
  },
  {
    name: "Worker4",
    type: "shoemaker",
    link: "/booking",
    img: "../../../uploads/bg.jpeg",
    desc: "This command will add the library to your project.",
  },
  {
    name: "Worker5",
    type: "shoemaker",
    link: "/booking",
    img: "../../../uploads/bg.jpeg",
    desc: "This command will add the library to your project.",
  },
];

export const cartCategories = [
  {
    icon: <i class="fas fa-utensils"></i>,
    title: "Cleaning",
    type: "Cleaning",
    bgColor: "#f5f0ea",
  },
  {
    icon: <i class="fa fa-th-large"></i>,
    title: "Brick Laying",
    type: "Brick Laying",
    bgColor: "#e5eee5",
  },
  {
    icon: <i class="fa fa-apple"></i>,
    title: "Cooking",
    type: "Cooking",
    bgColor: "#f2f2ae",
  },
  {
    icon: <i class="fa fa-code"></i>,
    title: "Coding",
    type: "Coding",
    bgColor: "#f2e2cc",
  },
  {
    icon: <i class="fa fa-book"></i>,
    title: "Reading",
    type: "Reading",
    bgColor: "#f1e2ac",
  },
  {
    icon: <i class="fa fa-bed"></i>,
    title: "Carpenter",
    type: "Carpenter",
    bgColor: "#f7f7ea",
  },
  {
    icon: <i class="fa fa-music"></i>,
    title: "Singing",
    type: "Singing",
    bgColor: "#f2f2cc",
  },
  {
    icon: <i class="fas fa-plug"></i>,
    title: "Electrician",
    type: "Electrician",
    bgColor: "#f7f7ea",
  },
  {
    icon: <i class="fa fa-shower"></i>,
    title: "Washing",
    type: "Washing",
    bgColor: "#f1f4ff",
  },
  {
    icon: <i class="fa fa-minus"></i>,
    title: "Plumber",
    type: "Plumber",
    bgColor: "#f7f7ea",
  },
  {
    icon: <i class="fa fa-pied-piper"></i>,
    title: "Shoe maker",
    type: "Shoe maker",
    bgColor: "#f5f0ea",
  },
  {
    icon: <i class="fa fa-male"></i>,
    title: "Tailor",
    type: "Tailor",
    bgColor: "#f2f2cc",
  },
  {
    icon: <i class="fas fa-television"></i>,
    title: "Tv Repairer",
    type: "Tv Repairer",
  },
];

export const artisanData = [
  {
    name: "Daniel",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "/service-provider",
    img: "../../../uploads/bg.jpeg",
  },
  {
    name: "Richard",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "#",
    img: "../../../uploads/bg.jpeg",
  },
  {
    name: "Doris",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "#",
    img: "../../../uploads/bg.jpeg",
  },
  {
    name: "Bismark",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "#",
    img: "../../../uploads/bg.jpeg",
  },
  {
    name: "Bismark",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "#",
    img: "../../../uploads/bg.jpeg",
  },
  {
    name: "Bismark",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "#",
    img: "../../../uploads/bg.jpeg",
  },
];

export const buyerValidate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length <= 8) {
    errors.password = "Must be 8 characters or more";
  }

  if (!values.usermail) {
    errors.usermail = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.usermail)
  ) {
    errors.usermail = "Invalid email address";
  }

  if (!values.tel) {
    errors.tel = "Required";
  } else if ((values.tel.length = 10)) {
    errors.tel = "Must be 10 characters";
  }
  if (!values.other_tel) {
    errors.other_tel = "Required";
  } else if ((values.other_tel.length = 10)) {
    errors.other_tel = "Must be 10 characters";
  }
  if (!values.location) {
    errors.location = "Required";
  } else if ((values.location.length = 0)) {
    errors.location = "Must not be empty";
  }

  return errors;
};
