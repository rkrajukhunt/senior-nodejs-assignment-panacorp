#include <napi.h>

long long fact(int n){
    if(n <= 1) return 1;
    return n * fact(n - 1);
}

Napi::Number Fact(const Napi::CallbackInfo& info){
    Napi::Env env = info.Env();
    if(info.Length() != 1 || !info[0].IsNumber()){
        Napi::TypeError::New(env, "Expected one number argument").ThrowAsJavaScriptException();
    }
    int arg = info[0].As<Napi::Number>();
    long long returnVal = fact(arg);
    return Napi::Number::New(env, returnVal);
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports){
    exports.Set("fact", Napi::Function::New(env, Fact));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)