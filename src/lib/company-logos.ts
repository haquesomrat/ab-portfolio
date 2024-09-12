type Companies = {
  id: number;
  src: string;
  name: string;
};

export function getAllCompanies(): Companies[] {
  return [
    { id: 1, src: "/images/company-logos/acme.png", name: "acme" },
    { id: 2, src: "/images/company-logos/amara.png", name: "amara" },
    { id: 3, src: "/images/company-logos/atica.png", name: "atica" },
    { id: 4, src: "/images/company-logos/aven.png", name: "aven" },
    { id: 5, src: "/images/company-logos/asgardia.png", name: "asgardia" },
    { id: 6, src: "/images/company-logos/hexlab.png", name: "hexlab" },
  ];
}
