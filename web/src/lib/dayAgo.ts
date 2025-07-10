import lib from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-BR' 

lib.locale("pt-br");
lib.extend(relativeTime)

export const dayAgo = lib;