--create table [#tempbolnice] (
--[ID] [int] identity,
--[naziv] [nvarchar] (max) NULL,
--[duzina] [int],
--[sirina] [int]);



set identity_insert [#tempbolnice] on;


insert [#tempbolnice] ([ID],[naziv],[duzina],[sirina])
select 3,N'Gradska bolnica',5,5 UNION ALL
select 5,N'Klinicki centar',7,4;

set identity_insert [#tempbolnice] off;

set identity_insert [#tempbolesti] on;


insert [#tempbolesti] ([ID],[nazivBolesti],[simptomi])
select 4,N'Kovid',N'Temperatura, malaksalost, gubitak ukusa i mirisa' UNION ALL
select 5,N'Prehlada',N'Temperatura, bol u grlu' UNION ALL
select 6,N'Alergija',N'Neuobicajeno ponasanje tela, bubuljice, gusenje';

set identity_insert [#tempbolesti] off;