const fallbackSocial = {
  linkedin: "#",
  x: "#",
  facebook: "#",
};

const fallbackContact = {
  email: "info@dm23.co.in",
  phone: "+91 9148 27 47 43",
};

export function getSiteContact() {
  return {
    email: process.env.NEXT_PUBLIC_SITE_EMAIL?.trim() || fallbackContact.email,
    phone: process.env.NEXT_PUBLIC_SITE_PHONE?.trim() || fallbackContact.phone,
  };
}

export function getSocialLinks() {
  return {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || fallbackSocial.linkedin,
    x: process.env.NEXT_PUBLIC_X_URL?.trim() || fallbackSocial.x,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || fallbackSocial.facebook,
  };
}