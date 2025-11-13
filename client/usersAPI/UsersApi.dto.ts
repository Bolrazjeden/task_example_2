export type GetUsersResponseDTO = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserDTO[];
  support: SupportDTO;
  _meta: MetaDTO;
};

export type UserDTO = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type SupportDTO = {
  url: string;
  text: string;
};

export type MetaDTO = {
  powered_by: string;
  upgrade_url: string;
  docs_url: string;
  template_gallery: string;
  message: string;
  features: string[];
  upgrade_cta: string;
};

export type PostUserResponseDTO = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};
