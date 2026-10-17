export interface Company {
  readonly description?: readonly string[];
  readonly summary?: string;
  readonly highlights?: readonly string[];
  readonly location?: string;
  readonly from?: number | string;
  readonly name?: string;
  readonly position?: string;
  readonly technologies?: string;
  readonly to?: string | number;
  readonly url?: string;
}
