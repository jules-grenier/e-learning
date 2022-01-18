import { AuthState } from "vue";
import { Store as VuexStore, ActionContext } from "vuex";
import { User, UserLogin, UserRegistration } from "./user";

declare module "@vue/runtime-core" {
  export interface AuthState {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    token: string;
    error: string;
    isAuthenticated: boolean;
  }

  export type AuthCredentials = Omit<AuthState, "error">;

  interface State {
    auth: AuthState;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: VuexStore<State>;
  }
}

// Auth module typings

export type AuthGetters = {
  isAuthenticated(state: AuthState): boolean;
  user(state: AuthState): User;
  token(state: AuthState): string;
  error(state: AuthState): string;
};

export type AuthMutations = {
  setAuthentication(state: AuthState, payload: AuthCredentials): void;
  setError(state: AuthState, payload: string): void;
  resetAuthentication(state: AuthState, payload: undefined): void;
};

type AuthAugmentedActionContext = {
  commit<K extends keyof AuthMutations>(key: K, payload: Parameters<AuthMutations[K]>[1]): ReturnType<AuthMutations[K]>;
} & Omit<ActionContext<State, unknown>, "commit">;

export interface AuthActions {
  retrieveProfile(context: AuthAugmentedActionContext, payload: string): Promise<User | undefined>;
  register(context: AuthAugmentedActionContext, payload: UserRegistration): Promise<void>;
  login(context: AuthAugmentedActionContext, payload: UserLogin): Promise<void>;
  logout(context: AuthAugmentedActionContext, payload: undefined): void;
}

export type Store<S = AuthState> = Omit<VuexStore<S>, "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof AuthMutations, P extends Parameters<AuthMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<AuthMutations[K]>;
} & {
  getters: {
    [K in keyof AuthGetters]: ReturnType<AuthGetters[K]>;
  };
} & {
  dispatch<K extends keyof AuthActions>(
    key: K,
    payload: Parameters<AuthActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<AuthActions[K]>;
};
