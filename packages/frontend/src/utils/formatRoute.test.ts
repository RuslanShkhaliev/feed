import { describe, expect, it } from 'vitest'
import { formatRoute } from '@/utils/formatRoute.ts'

describe('formatRoute', () => {
	it('should be replace one parameter correctly', () => {
		const route = '/users/:id'
		const params = { id: 123 }

		expect(formatRoute(route, params)).toBe('/users/123')
	})
	it('should be replace few parameters correctly', () => {
		const route = '/users/:id/posts/:postId'
		const params = { id: 123, postId: 321 }

		expect(formatRoute(route, params)).toBe('/users/123/posts/321')
	})
	it('должен корректно работать без параметров (ничего не заменяет)', () => {
		const route = '/static/path'
		const params = {}
		expect(formatRoute(route, params)).toBe('/static/path')
	})

	it('должен корректно работать, если переданы лишние параметры', () => {
		const route = '/users/:id'
		const params = { id: 7, extra: 'неиспользуемый' }
		expect(formatRoute(route, params)).toBe('/users/7')
	})

	it('должен корректно работать, если параметр в маршруте отсутствует', () => {
		const route = '/products/:id/details'
		const params = { name: 'apple' } // Нет параметра 'id'
		expect(formatRoute(route, params)).toBe('/products/:id/details')
	})

	it('должен корректно работать, если в маршруте несколько одинаковых параметров', () => {
		const route = '/:lang/products/:lang/items'
		const params = { lang: 'ru' }
		expect(formatRoute(route, params)).toBe('/ru/products/ru/items')
	})

	it('должен корректно работать, если route пустой', () => {
		const route = ''
		const params = { id: 1 }
		expect(formatRoute(route, params)).toBe('')
	})

	it('должен корректно работать, если параметры пустые', () => {
		const route = '/users/:id'
		const params = {}
		expect(formatRoute(route, params)).toBe('/users/:id')
	})
})
