do $$
    declare
  cons_name text;
begin
    select conname
    into cons_name
    from pg_constraint
    where
            conrelid = 'questions'::regclass
      and contype = 'u';

    execute 'alter table questions drop constraint '||cons_name;
end;
$$
