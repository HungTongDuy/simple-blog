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

export const SET_USER = 'SET_USER';

export const TOGGLE_OPEN_DIALOG_SIGNIN = 'TOGGLE_OPEN_DIALOG_SIGNIN';

export const TOGGLE_CLOSE_DIALOG_SIGNIN = 'TOGGLE_CLOSE_DIALOG_SIGNIN';

export const CLEAR_USER = 'CLEAR_USER';

export const PROGRESS_PUBLISH = 'PROGRESS_PUBLISH';

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

export const API_USER_SIGNIN_URL = `${API_BASE_URL}/api/user/signin/`;

export const API_USER_URL = `${API_BASE_URL}/api/user/`;

export const API_USER_FOLLOW_URL = `${API_BASE_URL}/api/user/follow/`;

export const API_LOGIN_URL = `${API_BASE_URL}/api/signin/`;
