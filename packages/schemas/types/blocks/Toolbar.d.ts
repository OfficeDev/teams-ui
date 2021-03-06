import { ButtonProps } from '../inputs'
import { ActionPayload } from '../lib/actions'
import { MenuItemSequence } from '../lib/menu'

export interface FilterActionPayload extends ActionPayload {
  activeFilters: Record<string, Record<string, string>>
}

export interface FilterProps {
  actionId: string
  filterGroups: Record<
    string,
    {
      label: string
      filters: Record<
        string,
        {
          label: string
        }
      >
    }
  >
}

export interface ToolbarProps {
  toolbar: {
    items: MenuItemSequence
    iconSize?: ButtonProps['iconSize']
    buttonSize?: ButtonProps['size']
    /**
     * An actionId
     */
    find?: string
    filter?: FilterProps
  }
}
