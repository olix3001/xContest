// eslint-disable-next-line prettier/prettier
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ExecService } from '../../service/exec/exec.service';
@Controller('exec')
export class ExecController {
  constructor(private execService: ExecService) {}
  @Post()
  exec(@Body() bodyContents): any {
    if (!bodyContents.code || !bodyContents.contest || !bodyContents.question) {
      console.log(
        `${!bodyContents.code} || ${!bodyContents.contest} || ${!bodyContents.question}`,
      );

      throw new BadRequestException();
    }
    return this.execService.startWorker(
      bodyContents.code,
      bodyContents.contest,
      bodyContents.question,
    );
  }
  @Get(':id')
  ans(@Param('id') id: string): any {
    const response = this.execService.retrieveAns(id);
    if (!response) {
      throw new BadRequestException();
    }
    return response;
  }
}
