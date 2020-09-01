export interface ITeamShort {
  id: string;
  name: string;
  membersAmount: number;
  deleteLoading?: boolean;
}

export interface ITeam {
  id: string;
  name: string;
  teamLeadId: string | null;
  membersId: string[];
}

export interface ITeamUpdate {
  id: string;
  name: string;
}

export interface ITeamCreate {
  name: string;
}

export interface ITeamUserToggle {
  teamId: string;
  userId: string;
  username: string;
}

export interface ITeamLeadToggle {
  teamId: string;
  userId: string;
  username: string;
}
