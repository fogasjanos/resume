export interface Company {
  readonly description: readonly string[];
  readonly from?: number;
  readonly name?: string;
  readonly position?: string;
  readonly technologies?: string;
  readonly to?: string;
  readonly url?: string;
}
