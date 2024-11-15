export const defaultSession: SessionInter = {
    user_id: 0,
    username: undefined,
    role: undefined,
    permissions: undefined,
    dept: undefined,
    page: undefined,
    school: undefined,
    is_superuser: false,
    isLoggedIn: false,
    exp: undefined,
    created_at: undefined,
    access: "",
    refresh: "",
}

export interface SessionInter {
    user_id: number | undefined
    username: string | undefined
    role: string | undefined
    permissions: string[] | string | undefined
    dept: string[] | string | undefined
    page: string[] | string | undefined
    school: string[] | string | undefined
    is_superuser: boolean | undefined
    isLoggedIn: boolean
    exp: any | undefined
    created_at: any | undefined
    access: any | undefined
    refresh: any | undefined
}

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export type GetSchoolInfoInter = {
    id: number;
    campus__id: number;
    campus__name: string;
    campus__region: string;
    main_school: boolean;
    school_name: string;
    school_name_short: string;
    school_type: string;
    country: string;
    town?: string;
    po_box: string;
    email: string;
    niu: string;
    telephone: string;
    website: string;
    created_by__full_name?: string;
    created_at: string;
    updated_by__full_name?: string;
    updated_at: string;
};

export type GetDomainInter = {
    id: number;
    domain_name: string;
    created_by__full_name: string;
    created_at: string;
    updated_by__full_name?: string;
    updated_at: string;
};

export type GetFieldInter = {
    id: number;
    field_name: string;
    domain__id: number;
    domain__domain_name: string;
    created_by__full_name: string;
    created_at: string;
    updated_by__full_name?: string;
    updated_at: string;
};


export type GetMainSpecialtyInter = {
    id: number;
    field__id: number;
    field__field_name: string;
    field__domain__id: number;
    field__domain__domain_name: string;
    specialty_name: string;
    specialty_name_short: string;
    created_by__full_name?: string;
};


export type GetSpecialtyInter = {
    id: number;
    main_specialty__id: number;
    main_specialty__field__domain__id: number;
    main_specialty__specialty_name: string;
    school__campus__id: number;
    school__campus__name: string;
    school__school_name: string;
    level__id: number;
    level__level: number;
    academic_year: string;
    tuition: string;
    payment_one: number;
    payment_two: number;
    payment_three: number;
    created_by__full_name?: string;
};


export type GetMainCourseInter = {
    id: number;
    field__id: string;
    field_name: string;
    field__domain__id: string;
    field__domain__domain_name: string;
    course_name: string;
    created_by__full_name?: string;
};


export type GetCourseInter = {
    id: number;
    main_course__id: string;
    main_course__course_name: string;
    specialty__id: string;
    specialty__main_specialty__specialty_name: string;
    specialty__main_specialty__field__domain__domain_name: string;
    specialty__academic_year: string;
    specialty__level__level: number;
    specialty__school__campus__region: string;
    specialty__school__campus__name: string;
    course_code: string;
    course_type: string;
    semester: string;
    course_credit: string;
    completed: boolean;
    assigned: boolean;
    paid: boolean;
    assigned_to__id?: string;
    assigned_to__full_name?: string;
    hours: number;
    hours_left: number;
    date_assigned: string;
    created_by__full_name?: string;
};


export type GetResultInter = {
    id: number;
    student__id: number;
    student__user__first_name: string;
    student__user__full_name: string;
    student__specialty__main_specialty__specialty_name: string;
    student__specialty__academic_year: string;
    student__specialty__level__level: string;
    student__specialty__school__school_name: string;
    student__specialty__school__region: string;
    student__specialty__school__address: string;
    course__id: number;
    course__main_course__course_name: string;
    course__course_code: string;
    course__course_credit: number;
    ca: number;
    exam: number;
    resit: number;
    average: number;
    validated: boolean;
    publish_ca: boolean;
    publish_exam: boolean;
    publish_resit: boolean;
    closed: boolean;
    active: boolean;
    course__assigned_to__full_name: string;
    created_by__full_name?: string;
    updated_at?: string;
};



export type GetUserProfileInter = {
    id: number;
    user__id: number;
    user__matricle: string;
    user__username: string;
    user__first_name: string;
    user__last_name: string;
    user__full_name: string;
    user__role: string;
    user__age: string;
    user__sex: string;
    user__address: string;
    user__telephone: string;
    user__email: string;
    user__title: string;
    specialty__id: string;
    specialty__school__campus__id: number;
    specialty__school__school_type: "Section-H" | "Section-S" | "Section-P" | "Section-V";
    specialty__main_specialty__specialty_name: string;
    specialty__academic_year: string;
    specialty__level__level: number;
    specialty__tuition: number;
    specialty__payment_one: number;
    specialty__payment_two: number;
    specialty__payment_three: number;
    program__id: number;
    session: string;
    user__is_active: boolean;
    user__is_superuser: boolean;
  };
  


export type GeAppearanceInter = {
  id: number;
  user__matricle: string;
  user__username: string;
  user__first: string;
  user__full_name: string;
  user__age: string;
  user__sex: string;
  user__address: string;
  user__telephone: string;
  user__email: string;
  user__title: string;
  user__is_active: boolean;
  dark_mode: string;
  lang: string;
};

export type GetProgramInter = {
  id: number;
  name: string;
  description: string;
};


export type SchoolFeesInter = {
    id: number;
    userprofile__id: number;
    platform_charges: number;
    platform_paid: boolean;
    balance: number;
    created_at: string;
    updated_at: string;
  };
  
  export type TransactionsInter = {
    id: number;
    name: string;
    account_name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };

  export type GetAccountInter = {
    id: number;
    name: string;
    number: string;
    year: string;
    balance: number;
    status: string;
  }
  
  
  export type GetSchoolFeesInter = {
    id: number;
    userprofile__id: number;
    userprofile__user__full_name: string;
    userprofile__user__username: string;
    userprofile__user__role: string;
    userprofile__user__matricle: string;
    userprofile__specialty__id: number;
    userprofile__specialty__school__school_type: "Section-H" | "Section-S" | "Section-P" | "Section-V";
    userprofile__specialty__main_specialty__specialty_name: string;
    userprofile__specialty__academic_year: string;
    userprofile__specialty__level__level: string;
    userprofile__specialty__tuition: number;
    userprofile__specialty__registration: number;
    userprofile__specialty__payment_one: number;
    userprofile__specialty__payment_two: number;
    userprofile__specialty__payment_three: number;
    userprofile__specialty__school__campus__id: number;
    userprofile__specialty__school__campus__name: number;
    platform_charges: number;
    platform_paid: boolean;
    balance: number;
  };
  
  export type GetTransactionsInter = {
    id: number;
    payment_method: string;
    ref: string;
    reason: string;
    account: string;
    operation_type: string;
    amount: number;
    telephone: string;
    payer_name: string;
    status: string;
    operator: string;
    created_by__full_name: string;
    updated_by__full_name: string;
    created_at: string;
    schoolfees__userprofile__id: number;
    schoolfees__userprofile__user__full_name: string;
    schoolfees__userprofile__user__username: string;
    schoolfees__userprofile__user__role: string;
    schoolfees__userprofile__user__matricle: string;
    schoolfees__userprofile__specialty__main_specialty__specialty_name: string;
    schoolfees__userprofile__specialty__academic_year: string;
    schoolfees__userprofile__specialty__level__level: string;
    schoolfees__userprofile__specialty__tuition: number;
    schoolfees__userprofile__specialty__payment_one: number;
    schoolfees__userprofile__specialty__payment_two: number;
    schoolfees__userprofile__specialty__payment_three: number;
    schoolfees__balance: number;
    from_account__id: number;
    from_account__name: string;
    to_account__id: number;
    to_account__name: string;
  };
  
  export type GetTranscriptApplicationInter = {
    id: number;
    status: string;
    created_by__full_name: string;
    updated_by__full_name: string;
    created_at: string;
    userprofile__id: number;
    userprofile__user__full_name: string;
    userprofile__user__matricle: string;
    userprofile__user__telephone: string;
    userprofile__specialty__main_specialty__specialty_name: string;
    userprofile__specialty__academic_year: string;
    userprofile__specialty__level__level: string;
    userprofile__specialty__tuition: number;
    userprofile__specialty__payment_one: number;
    userprofile__specialty__payment_two: number;
    userprofile__specialty__payment_three: number;
    print_count: number;
    approved_by__id: number;
    approved_by__full_name: string;
    approved_at: string;
    printed_by__id: number;
    printed_by__full_name: string;
    printed_at: string;
  };