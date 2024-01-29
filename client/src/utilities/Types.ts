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
