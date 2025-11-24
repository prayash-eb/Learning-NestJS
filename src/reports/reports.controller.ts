import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDTO } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Post()
    async createReport(@Body() body: CreateReportDTO) {

    }
}
