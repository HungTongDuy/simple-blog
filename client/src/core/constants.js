//=========================================================
//  CONSTANTS
//---------------------------------------------------------
export const APP_NAME = 'soundcloud-redux';

//=========================================================
//  ACTIONS
//---------------------------------------------------------
export const HOME_PAGE_LOADED = 'HOME_PAGE_LOADED';

export const DELETE_ARTICLE= 'DELETE_ARTICLE';

export const SET_EDIT = 'SET_EDIT'

export const SUBMIT_ARTICLE = 'SUBMIT_ARTICLE';

export const EDIT_ARTICLE = 'EDIT_ARTICLE';

//=========================================================
//  SERVER
//---------------------------------------------------------
export const HOST = 'localhost';

export const PORT = 8000;

//=========================================================
//  API
//---------------------------------------------------------
export const API_BASE_URL = `http://${HOST}:${PORT}`;

export const API_ARTICLE_URL = `${API_BASE_URL}/api/articles/`;

export const API_ARTICLE_EDITOR_URL = `${API_BASE_URL}/api/article/editor/`;

