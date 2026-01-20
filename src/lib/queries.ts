export const GET_SLIDESHOW = `
  query GetSlides {
    ieeeSideshows {
      id
      title: headertitle
      uniname:universityname
      tagline:tagline
      sideshowImages {
        url
      }
    }
  }
`;

export const GET_EVENTS = `
  query GetEvents {
    events {
      id
      title
      description
      date
      coverImage {
        url
      }
      otherImages {
        url
      }
    }
  }
`;

export const GET_STAFF = `
  query GetStaff {
    directorBoards {
      id
      name
      post
      department
      linkdn
      email
      profilePicture {
        url
      }
    }
  }
`;

export const GET_NEWS = `
  query GetNews {
    newsmodels {
      id
      newheader
      newsDescription
      newsUrl
      newsDate
      coverImage {
        url
      }
    }
  }
`;

export const GET_NEWSLETTERS = `
  query GetNewsletters {
    newsletters {
      id
      title
      coverpage {
        url
      }
      letterPdf {
        url
      }
    }
  }
`;
