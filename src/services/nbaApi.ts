import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_NBA_API_BASE_URL ;

export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface Game {
  id: number;
  date: string;
  home_team: Team;
  visitor_team: Team;
  home_team_score: number;
  visitor_team_score: number;
  status: string;
}

export const nbaApi = {
  async getTeams() {
    const response = await axios.get(`${API_BASE_URL}/teams`);
    return response.data.data;
  },

  async getGames(date?: string) {
    const response = await axios.get(`${API_BASE_URL}/games`, {
      params: { dates: date ? [date] : [] }
    });
    return response.data.data;
  },

  async getPlayers(page = 1) {
    const response = await axios.get(`${API_BASE_URL}/players`, {
      params: { page, per_page: 25 }
    });
    return response.data;
  }
};