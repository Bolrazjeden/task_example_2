import { expect } from "@playwright/test";

export class UsersExpected {
  getUsersResponse = {
    page: expect.any(Number),
    per_page: expect.any(Number),
    total: expect.any(Number),
    total_pages: expect.any(Number),
    data: expect.arrayContaining([
      {
        id: expect.any(Number),
        email: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        avatar: expect.any(String),
      },
    ]),
    support: {
      url: expect.any(String),
      text: expect.any(String),
    },
    _meta: {
      powered_by: expect.any(String),
      upgrade_url: expect.any(String),
      docs_url: expect.any(String),
      template_gallery: expect.any(String),
      message: expect.any(String),
      features: expect.arrayContaining([expect.any(String)]),
      upgrade_cta: expect.any(String),
    },
  };

  postUserResponse = {
    name: expect.any(String),
    job: expect.any(String),
    id: expect.any(String),
    createdAt: expect.any(String),
  };
}
