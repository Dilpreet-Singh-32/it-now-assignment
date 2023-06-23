export class UserModel {
  id: number;
  name: string;
  email: string;
  dob: Date;
  city: string;
  pinCode: number;

  constructor(data: UserModel) {
    Object.assign(this, data);
  }

  static parseFromJSON(jsonString: string | null): UserModel[] {
    if (!jsonString || jsonString === '') return [];

    return JSON.parse(jsonString, (key, value) => {
      if (key === 'dob') {
        return new Date(value);
      }

      return value;
    });
  }
}
