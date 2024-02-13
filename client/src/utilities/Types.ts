export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
} | null;

export type ElectionType = {
  id?: number;
  name: string;
  photo_url?: string;
  admin_id: number;
  candidate_reg_id: number;
  voter_reg_id: number;
  start_date: Date;
  end_date: Date;
};

export type PositionType = {
  id?: number;
  name: string;
  election_id: number;
};

export type CandidateApplicationType = {
  id?: number;
  user_id?: number;
  id_number?: string;
  user_photo_url?: string;
  id_photo_url?: string;
  election_id?: number;
  position_id?: number;
  manifesto?: string;
  status?: string;
};

export type VoterApplicationType = {
  id?: number;
  user_id?: number;
  id_number?: string;
  user_photo_url?: string;
  id_photo_url?: string;
  election_id?: number;
  status?: string;
};
