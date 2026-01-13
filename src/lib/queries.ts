export const GET_SLIDESHOW = `
  query GetSlides {
    ieeeSideshows {
      id
      title: ieeeSideshowHeaderTitle
      sideshowImages {
        url
      }
    }
  }
`;
