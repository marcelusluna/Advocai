/**
 * Serviço para manipulação de armazenamento local
 * Gerencia persistência de dados entre atualizações da página
 */

export const STORAGE_KEYS = {
  USER_DATA: 'user_data',
  USER_PROFILE_FORM: 'user_profile_form',
  APP_STATE: 'app_state',
  CLIENTS: 'clients_data',
  DOCUMENTS: 'documents_data',
  PETITIONS: 'petitions_data',
  CASES: 'cases_data',
};

/**
 * Salva dados no localStorage
 * @param key Chave para identificar o dado
 * @param data Dados a serem salvos
 */
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao salvar dados no localStorage (chave: ${key}):`, error);
  }
};

/**
 * Recupera dados do localStorage
 * @param key Chave para identificar o dado
 * @param defaultValue Valor padrão caso não exista dado com a chave especificada
 * @returns Dados recuperados ou valor padrão
 */
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData === null) return defaultValue;
    return JSON.parse(storedData) as T;
  } catch (error) {
    console.error(`Erro ao recuperar dados do localStorage (chave: ${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove dados do localStorage
 * @param key Chave para identificar o dado a ser removido
 */
export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover dados do localStorage (chave: ${key}):`, error);
  }
};

/**
 * Limpa todos os dados do localStorage
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
  }
}; 