export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
};

export type ElectionType = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  photo_url: string;
};

export type PositionType = {
  id: number;
  name: string;
  election_id: number;
};
