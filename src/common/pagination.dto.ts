import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class PaginationDTO {
  /** Number of the page to retrieve the data */
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  /** Number of records to retrieve per page */
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  pageSize = 10;

  /** Word to search for */
  @IsOptional()
  @IsString()
  term?: string;
}
