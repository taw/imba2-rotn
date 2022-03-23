tag app
	prop text = "Hello, World!"

	def rot(n)
		text.replace /[a-z]/gi do |c|
			let i = c.charCodeAt(0)
			if i >= 97 and i <= 122
				String.fromCharCode(((i - 97 + n) % 26) + 97)
			else if i >= 65 and i <= 90
				String.fromCharCode(((i - 65 + n) % 26) + 65)
			else
				c

	def upload(event)
		let file = event.target.files[0]
		return unless file
		let reader = new FileReader
		reader.onload = do |event|
			text = event.target.result
			imba.commit()
		reader.readAsText(file)

	<self>
		<div.contents>
			<header>
				"ROT-N"
			<textarea bind=text>
			<div>
				<input#file type="file" :change.upload>
			<table>
				for i in [1 .. 25]
					<tr>
						<th>
							i
						<td>
							rot(i)

	css
		display: flex
		justify-content: space-around
		max-width: 1000px
		margin: auto
		ff: sans

		header
			font-size: 64px
			text-align: center

		textarea
			min-width: 50vw
			min-height: 100px

		th
			padding-right: 5px

imba.mount <app>
