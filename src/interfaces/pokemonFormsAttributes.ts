export type parameterType = 'types' | 'abilities' | 'base_stat' | 'effort' | 'height' | 'weight'

export interface parameterProps {
    default: 'types' | 'abilities' | 'height' | 'weight',
    stats: 'base_stat' | 'effort',
    types: 'types' | 'abilities' | 'base_stat' | 'effort' | 'height' | 'weight'
}

export type modeType = keyof parameterProps

export interface showFormProps {
    forms?: Record<number, boolean>,
    existing_valid_forms?: boolean
}