type Routes = {
    root: string;
    about: string;
    diagram: string;
    accounts: string;
    account: string;
    'sign-in': string;
    'sign-up': string;
    forbiden: string;
    not_found: string;
};

export type GlobalContext = {
    routes: Routes;
};
