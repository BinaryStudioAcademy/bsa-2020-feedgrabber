alter table requests
    add column excel_report_id uuid,
    add column powerpoint_report_id uuid;

alter table requests add foreign key (excel_report_id) references files (id);
alter table requests add foreign key (powerpoint_report_id) references files (id);
