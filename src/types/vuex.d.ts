import { AuthState, CoursesState } from "vue";
import { Store as VuexStore, ActionContext } from "vuex";
import { User, UserLogin, UserRegistration } from "./user";
import { Course, UserCourse } from "./courses";
import { CartItem } from "./cart";

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

  export interface CoursesState {
    items: Course[];
    error: string;
  }

  export interface CartState {
    items: CartItem[];
    error: string;
  }

  export interface UserState {
    courses: UserCourse[];
    error: string;
  }

  export type AuthCredentials = Omit<AuthState, "error">;

  interface State {
    auth: AuthState;
    courses: CoursesState;
    cart: CartState;
    user: UserState;
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

export type AuthStore<S = AuthState> = Omit<VuexStore<S>, "commit" | "getters" | "dispatch"> & {
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

// Courses module typings

export type CoursesGetters = {
  list(state: CoursesState): Course[];
  error(state: CoursesState): string;
};

export type CoursesMutations = {
  setCourses(state: CoursesState, payload: Course[]): void;
  setError(state: CoursesState, payload: string): void;
};

type CoursesAugmentedActionContext = {
  commit<K extends keyof CoursesMutations>(
    key: K,
    payload: Parameters<CoursesMutations[K]>[1]
  ): ReturnType<CoursesMutations[K]>;
} & Omit<ActionContext<State, unknown>, "commit">;

export interface CoursesActions {
  fetchCourses(context: CoursesAugmentedActionContext): Promise<Course[] | undefined>;
  getCourse(context: CoursesAugmentedActionContext, courseId: string): Course | undefined;
}

export type CoursesStore<S = CoursesState> = Omit<VuexStore<S>, "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof CoursesMutations, P extends Parameters<CoursesMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<CoursesMutations[K]>;
} & {
  getters: {
    [K in keyof CoursesGetters]: ReturnType<CoursesGetters[K]>;
  };
} & {
  dispatch<K extends keyof CoursesActions>(
    key: K,
    payload: Parameters<CoursesActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<CoursesActions[K]>;
};

// Cart module typings

export type CartGetters = {
  list(state: CartState): CartItem[];
  length(state: CartState): number;
  error(state: CartState): string;
};

export type CartMutations = {
  setItem(state: CartState, payload: CartItem): void;
  deleteItem(state: CartState, payload: CartItem): void;
  emptyList(state: CartState, payload: null): void;
  setError(state: CartState, payload: string): void;
};

type CartAugmentedActionContext = {
  commit<K extends keyof CartMutations>(key: K, payload: Parameters<CartMutations[K]>[1]): ReturnType<CartMutations[K]>;
} & Omit<ActionContext<State, unknown>, "commit">;

export interface CartActions {
  add(context: CartAugmentedActionContext, item: CartItem): void;
  remove(context: CartAugmentedActionContext, item: CartItem): void;
  isInCart(context: CartAugmentedActionContext, item: Course): boolean;
  empty(context: CartAugmentedActionContext): void;
}

export type CartStore<S = CartState> = Omit<VuexStore<S>, "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof CartMutations, P extends Parameters<CartMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<CartMutations[K]>;
} & {
  getters: {
    [K in keyof CartGetters]: ReturnType<CartGetters[K]>;
  };
} & {
  dispatch<K extends keyof CartActions>(
    key: K,
    payload: Parameters<CartActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<CartActions[K]>;
};

// User module typings

export type UserGetters = {
  courses(state: UserState): UserCourse[];
  error(state: UserState): string;
};

export type UserMutations = {
  setCourses(state: UserState, payload: UserCourse[]): void;
  setError(state: UserState, payload: string): void;
};

type UserAugmentedActionContext = {
  commit<K extends keyof UserMutations>(key: K, payload: Parameters<UserMutations[K]>[1]): ReturnType<UserMutations[K]>;
} & Omit<ActionContext<State, unknown>, "commit">;

export interface UserActions {
  fetchCourses(context: UserAugmentedActionContext, token: string): Promise<UserCourse[]>;
}

export type UserStore<S = UserState> = Omit<VuexStore<S>, "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof UserMutations, P extends Parameters<UserMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<UserMutations[K]>;
} & {
  getters: {
    [K in keyof UserGetters]: ReturnType<UserGetters[K]>;
  };
} & {
  dispatch<K extends keyof UserActions>(
    key: K,
    payload: Parameters<UserActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<UserActions[K]>;
};
