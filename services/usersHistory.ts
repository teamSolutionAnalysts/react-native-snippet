import AsyncStorage from '@react-native-community/async-storage';
import { includes } from 'lodash';

export class UsersHistory {
  private KEY = 'USERS_HISTORY';

  async check(userId: string) {
    const serializedUsers = await AsyncStorage.getItem(this.KEY);
    const users = serializedUsers ? JSON.parse(serializedUsers) : [];
    return includes(users, userId);
  }

  async add(userId: string) {
    const serializedUsers = await AsyncStorage.getItem(this.KEY);
    const users = serializedUsers ? JSON.parse(serializedUsers) : [];
    if (!includes(users, userId)) {
      await AsyncStorage.setItem(this.KEY, JSON.stringify([...users, userId]));
    }
  }
}

export default new UsersHistory();