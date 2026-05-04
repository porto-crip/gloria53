'use client'

import { GridIcon } from '@/icons/GridIcon'
import { ListIcon } from '@/icons/ListIcon'

const VIEW_OPTIONS = [
  {
    value: 'grid',
    label: 'Плитка',
    ariaLabel: 'Показать квартиры плиткой',
    icon: GridIcon,
  },
  {
    value: 'list',
    label: 'Список',
    ariaLabel: 'Показать квартиры списком',
    icon: ListIcon,
  },
]

const SliderSwitch = ({
  view = 'grid',
  setView,
  className = '',
}) => {
  return (
    <div
      className={`
        inline-flex rounded-4xl bg-dark/7
        p-1 shadow-inner
        ${className}
        `}
      role="group"
      aria-label="Переключение вида квартир"
    >
      <div className="relative grid grid-cols-2">
        <span
          className={`
            absolute left-0 top-0 z-0
            h-full w-1/2 rounded-4xl bg-accent
            shadow-sm transition-transform duration-300 ease-out
            ${view === 'grid' ? 'translate-x-0' : 'translate-x-full'}
          `}
          aria-hidden="true"
        />

        {VIEW_OPTIONS.map((option) => {
          const isActive = view === option.value
          const Icon = option.icon

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setView(option.value)}
              aria-label={option.ariaLabel}
              aria-pressed={isActive}
              className={`
                relative z-10 flex h-11 
                min-w-12 items-center justify-center
                rounded-4xl px-4 transition duration-200
                active:scale-[0.96] focus:outline-none focus-visible:ring-2
                focus-visible:ring-accent/40 focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'text-white'
                    : 'text-dark50 hover:text-dark'
                }
              `}
            >
              <Icon className={option.value === 'grid' ? 'h-4 w-4' : 'h-4 w-5'} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SliderSwitch