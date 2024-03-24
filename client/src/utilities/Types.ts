export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
};

export type CandidateType = {
  id: number;
  user_id: number;
  election_id: number;
  passport_photo_url: string;
  position_id: number;
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

export type CandidateApplicationType = {
  id: number;
  user_id: number;
  passport_photo_url: string;
  id_photo_url: string;
  student_id: string;
  election_id: number;
  position_id: number;
  status: "pending" | "accepted" | "rejected";
};

export type VoterApplicationType = {
  id: number;
  user_id: number;
  passport_photo_url: string;
  id_photo_url: string;
  student_id: string;
  election_id: number;
  status: "pending" | "accepted" | "rejected";
};

export type ResultType<T> = {
  success: {
    data: T;
    message: string;
  };
  error: { message: string };
};

export type VoteType = {
  election_id: number;
  candidate_id: number;
  position_id: number;
};

export type VoterType = {
  election_id: number;
  user_id: number;
  voted: boolean;
};
