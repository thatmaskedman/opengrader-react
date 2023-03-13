const LoginCard = () => {
    return (
        <>
        <div>
            <form className="" action="#">
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
            </form>
        </div>
        </>
    )
}

export default LoginCard 