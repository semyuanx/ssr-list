function createNote(type: any): any {
  if (type === 'repository') {
    return (namespace: string) => (Obj: any) => {
      const object = new Obj();
      return class Store {
        public namespace: string = namespace;

        public namespaced: boolean = true;

        public state: any = object.state || {};

        public actions: any = object.actions || {};

        public getters: any = object.getters || {};

        public mutations: any = object.mutations || {};
      };
    };
  }
  if (type === 'state') {
    return (Options: any) => {
      let initState = Options || null;
      if (typeof Options === 'function') {
        initState = new Options();
      }
      return (obj: any, key: string) => {
        const object = obj;
        object[type] = { ...object[type], [key]: initState || null };
      };
    };
  }
  if (type === 'set') {
    return (options: any) => (obj: any, name: string) => {
      const object = obj;
      // eslint-disable-next-line
      const setFun: any = (state: any, value: any) => { state[options] = value; };
      object.mutations = { ...object.mutations, ...{ [name]: setFun || null } };
    };
  }
  return (obj: any, key: any, content: any) => {
    const object = obj;
    object[type] = { ...object[type], [key]: content.value };
  };
}

export const State = createNote('state');
export const Action = createNote('actions');
export const Getter = createNote('getters');
export const Mutation = createNote('mutations');
export const Repository = createNote('repository');
export const Set = createNote('set');
