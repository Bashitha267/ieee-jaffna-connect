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
